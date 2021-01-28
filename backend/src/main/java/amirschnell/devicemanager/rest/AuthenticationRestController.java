package amirschnell.devicemanager.rest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationRestController {

    @RequestMapping(path = "/authenticate")
    private Authentication authenticate() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
