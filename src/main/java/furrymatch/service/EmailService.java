package furrymatch.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendResetPassword(String recipientEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("fuurryMatch@gmail.com");
        message.setTo(recipientEmail);
        message.setSubject("Solicitud de restablecimiento de contraseña - FurryMatch");
        message.setText(
            "Hola, hemos recibido una solicitud de restablecimiento de contraseña para tu cuenta de FurryMatch. Si no has solicitado este cambio, por favor ignora este mensaje."
        );
        javaMailSender.send(message);
    }
}
