package com.holoday.api.common.security;

import com.holoday.api.user.entity.User;
import com.holoday.api.user.repository.UserRepository;
import com.holoday.api.util.JWTUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
public class JWTCheckFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    public JWTCheckFilter(JWTUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json; charset=UTF-8");
            response.getWriter().write(
                    """
                       {"msg":"Access Token이 없습니다."}
                       """
            );
            return;
        }

        String token = authHeader.substring(7);

        if(!jwtUtil.validateToken(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json; charset=UTF-8");
            response.getWriter().write(
                    """
                            {"msg":"유효하지 않은 Access Token 입니다."}
                            """
            );

            return;
        }

        String userId = jwtUtil.getUserId(token);

        User user = userRepository.findByUserId(userId)
                        .orElseThrow(() ->
                                new UsernameNotFoundException("회원을 찾을 수 없습니다.")
                        );
        String role = user.isUserIsAdmin()
                ? "ROLE_ADMIN"
                : "ROLE_USER";

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        userId,
                        null,
                        List.of(new SimpleGrantedAuthority(role))
                );

        SecurityContextHolder.getContext()
                        .setAuthentication(authenticationToken);

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{

        String path = request.getRequestURI();
        String method = request.getMethod();

        return method.equals("OPTIONS")
                || path.equals("/api/holoday/login")
                || path.equals("/api/holoday/signup")
                || (method.equals("GET") && path.startsWith("/api/holoday/board"))
                || (method.equals("GET") && path.startsWith("/api/holoday/info"));
    }
}
