package com.holoday.api.common.config;

import com.holoday.api.common.security.JWTCheckFilter;
import com.holoday.api.user.repository.UserRepository;
import com.holoday.api.util.JWTUtil;
import lombok.*;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class CustomSecurityConfig {
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors ->
                    cors.configurationSource(corsConfigurationSource())
        )
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .formLogin(form -> form.disable())

                .authorizeHttpRequests(auth -> auth

                        //로그인 하지 않아도 접근 가능
                        .requestMatchers(
                                "/api/holoday/login",
                                "/api/holoday/signup",
                                "/error",
                                "/api/holoday/checkId",
                                "/api/holoday/checkEmail",
                                "/api/holoday/send",
                                "/api/holoday/authenticate"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/holoday/board",
                                "/api/holoday/board/*",
                                "/api/holoday/board/*/comments",
                                "/api/holoday/info",
                                "/api/holoday/info/*"

                        ).permitAll()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(
                        new JWTCheckFilter(jwtUtil, userRepository),
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(
                Arrays.asList("GET","POST","PATCH","DELETE", "OPTIONS")
        );
        configuration.setAllowedHeaders(
                Arrays.asList("Authorization", "Cache-Control", "Content-Type")
        );
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}