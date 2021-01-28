package amirschnell.devicemanager.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Device {

    public enum DeviceType {
        IPhone, Android, Windows_PC, MacBook
    }

    @Id
    @GeneratedValue
    private Long id;

    @Enumerated
    @Column(nullable = false)
    private DeviceType type;

    @Column(unique = true, nullable = false)
    private String name;

    @OneToOne(mappedBy = "device")
    private Rental rental;
}
