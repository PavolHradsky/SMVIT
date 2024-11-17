# Complete project details at https://RandomNerdTutorials.com/raspberry-pi-pico-ds18b20-micropython/

import machine, onewire, ds18x20, time
import urequests
import network

led = machine.Pin("LED", machine.Pin.OUT)
led.on()

# Connect to network
wlan = network.WLAN(network.STA_IF)
wlan.active(True)

# Fill in your network name (ssid) and password here:
ssid = 'Pixel 7'
password = '01189998819991197253'
wlan.connect(ssid, password, channel=12)

# Wait for connection
while not wlan.isconnected():
    wlan.connect(ssid, password, channel=12)
    time.sleep(1)
    led.on()
    time.sleep(0.5)
    led.off()
    time.sleep(0.1)
    led.on()
    time.sleep(0.5)
    led.off()
    time.sleep(0.1)

ds_pin = machine.Pin(22)
ds_sensor = ds18x20.DS18X20(onewire.OneWire(ds_pin))

roms = ds_sensor.scan()
print('Found DS devices: ', roms)

while True:
  ds_sensor.convert_temp()
  time.sleep_ms(750)
  for rom in roms:
    print(rom)
    tempC = ds_sensor.read_temp(rom)
    print('temperature (ºC):', "{:.2f}".format(tempC))
    try:
        r = urequests.post("http://49.12.65.96/temperature", data="{\"temperature\": " + "{:.2f}".format(tempC) + "}")
        print(r.json())
        r.close()
    except:
        led.on()
        time.sleep(0.1)
        led.off()
        time.sleep(0.1)
        led.on()
        time.sleep(0.1)
        led.off()
        time.sleep(0.1)
  led.on()
  time.sleep(1)
  led.off()
  time.sleep(1)


