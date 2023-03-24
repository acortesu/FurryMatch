package furrymatch.web.rest;

import furrymatch.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailSender;

    @PostMapping("/reset-password")
    public void resetPassword(@RequestBody String recipientEmail) {
        emailSender.sendResetPassword(recipientEmail);
    }
}
