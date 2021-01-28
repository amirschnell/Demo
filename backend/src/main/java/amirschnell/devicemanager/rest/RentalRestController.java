package amirschnell.devicemanager.rest;

import amirschnell.devicemanager.model.Rental;
import amirschnell.devicemanager.model.User;
import amirschnell.devicemanager.repository.RentalRepository;
import amirschnell.devicemanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/rentals")
public class RentalRestController {

    private final RentalRepository rentalRepository;
    private final UserRepository userRepository;

    @Autowired
    public RentalRestController(RentalRepository rentalRepository, UserRepository userRepository) {
        this.rentalRepository = rentalRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    private void addRental(@RequestBody Rental rental) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User u = userRepository.findByName(auth.getName());
        rental.setUser(u);
        rentalRepository.save(rental);
    }
}
