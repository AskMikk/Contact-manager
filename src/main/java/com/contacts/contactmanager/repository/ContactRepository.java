package com.contacts.contactmanager.repository;

import com.contacts.contactmanager.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
