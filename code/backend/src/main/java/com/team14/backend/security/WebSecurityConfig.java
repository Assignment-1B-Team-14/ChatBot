// package com.team14.backend.security;
//
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Configuration;
// import
// org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import
// org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import
// org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import
// org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.core.userdetails.UserDetailsService;
//
/// **
// * @author Florian Widder
// *
// */
// @Configuration
// @EnableWebSecurity
// public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//
// @Autowired
// private UserDetailsService userDetailsService;
//
// @Override
// protected void configure(HttpSecurity http) throws Exception {
// http.authorizeRequests().anyRequest().permitAll();
// //
// http.authorizeRequests().antMatchers("/public/**").permitAll().anyRequest()
// //
// .authenticated().and().formLogin().loginPage("/login").permitAll().and().logout().permitAll();
// }
//
// /**
// * @param auth
// * @throws Exception
// */
// @Autowired
// public void globalSecurityConfiguration(AuthenticationManagerBuilder auth)
// throws Exception {
// auth.userDetailsService(userDetailsService);
// }
//
// }
