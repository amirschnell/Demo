package amirschnell.devicemanager.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Rental {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private Device device;

    @ManyToOne
    private User user;
}
