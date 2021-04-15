/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package no.five.min.authentication;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Value("${jwt.name}")
    private String userid;
    
    @Value("${jwt.passwordhash}")
    private String password;
    

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO - this should be handled in another way. Either stored in a database, or in a config file, but not
		// In the source code
                
                
		if (userid.equals(username)) {
			return new User(userid, password,
					new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}
}
