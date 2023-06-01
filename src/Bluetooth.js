import React, { useRef, useEffect } from 'react';

export default function Bluetooth() {
  const details = useRef(null);

  useEffect(() => {
    async function connectBluetoothDevice() {
      try {
        // Request the Bluetooth device through the browser
        const device = await requestBluetoothDevice();

        // Connect to the GATT server
        // We also get the name of the Bluetooth device here
        let deviceName = device.gatt.device.name;
        const server = await device.gatt.connect();

        // Getting the services we mentioned before through the GATT server
        const batteryService = await server.getPrimaryService('battery_service');
        const infoService = await server.getPrimaryService('device_information');

        // Getting the current battery level
        const batteryLevelCharacteristic = await batteryService.getCharacteristic('battery_level');
        // Convert received buffer to number
        const batteryLevel = await batteryLevelCharacteristic.readValue();
        const batteryPercent = await batteryLevel.getUint8(0);

        // We will get all characteristics from device_information
        const infoCharacteristics = await infoService.getCharacteristics();
        console.log(infoCharacteristics);
        let infoValues = [];
        const promise = new Promise((resolve, reject) => {
          infoCharacteristics.forEach(async (characteristic, index, array) => {
            // Returns a buffer
            const value = await characteristic.readValue();
            console.log(new TextDecoder().decode(value));
            // Convert the buffer to string
            infoValues.push(new TextDecoder().decode(value));
            if (index === array.length - 1) resolve();
          });
        });

        promise.then(() => {
          // Display all the information on the screen
          // Use innerHTML
          details.current.innerHTML = `
            Device Name - ${deviceName}<br />
            Battery Level - ${batteryPercent}%<br />
            Device Information:
            <ul>
              ${infoValues.map((value) => `<li>${value}</li>`).join('')}
            </ul>
          `;
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }

    async function requestBluetoothDevice() {
      return new Promise((resolve, reject) => {
        const button = document.getElementById('bluetoothButton');
        button.addEventListener('click', async () => {
          try {
            const device = await navigator.bluetooth.requestDevice({
              optionalServices: ['battery_service', 'device_information'],
              acceptAllDevices: true,
            });
            resolve(device);
          } catch (error) {
            reject(error);
          }
        });
      });
    }

    connectBluetoothDevice();
  }, []);

  return (
    <div>
      <button id="bluetoothButton">Connect Bluetooth Device</button>
      <div ref={details}></div>
    </div>
  );
}