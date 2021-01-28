package amirschnell.devicemanager.rest;

import amirschnell.devicemanager.model.Device;
import amirschnell.devicemanager.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/devices")
public class DeviceRestController {

    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceRestController(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @GetMapping
    private List<Device> getAll() {
        return deviceRepository.findAll();
    }

    @GetMapping(path = "/available")
    private List<Device> getAllAvailable() {
        return deviceRepository.getByRentalIsNull();
    }

    @PostMapping
    private void addDevice(@RequestBody Device device) {
        deviceRepository.save(device);
    }

    @GetMapping(path = "/types")
    private List<Device.DeviceType> getAllTypes() {
        return List.of(Device.DeviceType.values());
    }
}
