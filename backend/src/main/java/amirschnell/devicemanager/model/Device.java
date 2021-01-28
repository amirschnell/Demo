package amirschnell.devicemanager.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Device {

    private enum DeviceType {
        IPhone, Android, Windows_PC, MacBook
    }

    @Id
    private long id;

    @Enumerated
    @Column
    private DeviceType deviceType;

    @Column
    private String Name;

    @OneToOne(mappedBy = "device")
    private Rental rental;
}
