package amirschnell.devicemanager.rest;

import amirschnell.devicemanager.model.User;
import amirschnell.devicemanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping(path = "/users")
public class UserRestController {

    private final UserRepository userRepository;

    @Autowired
    public UserRestController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    private void addNewUser(@RequestParam("name") String name, @RequestParam("password") String password) {
        User user = new User();
        user.setName(name);
        user.setPassword(new BCryptPasswordEncoder().encode(password));
        user.setType("ROLE_USER");
        userRepository.save(user);
    }
}
