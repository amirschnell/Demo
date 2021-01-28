package amirschnell.devicemanager.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class User {

    @Id
    private long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column
    private String password;

}
