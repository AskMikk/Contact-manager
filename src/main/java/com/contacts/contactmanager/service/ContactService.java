package com.contacts.contactmanager.service;

import com.contacts.contactmanager.entity.Contact;
import com.contacts.contactmanager.model.ContactDTO;
import com.contacts.contactmanager.repository.ContactRepository;
import com.contacts.contactmanager.util.ModelMapperFactory;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public List<ContactDTO> getContacts() {
        return contactRepository.findByIsActiveTrue()
                .stream()
                .map(contact -> ModelMapperFactory.getMapper().map(contact, ContactDTO.class))
                .collect(Collectors.toList());
    }

    public ContactDTO getContact(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact not found"));
        return ModelMapperFactory.getMapper().map(contact, ContactDTO.class);
    }

    public Long addContact(ContactDTO contactDTO) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return contactRepository.save(modelMapper.map(contactDTO, Contact.class)).getId();
    }

    public ContactDTO updateContact(Long id, ContactDTO contactDTO) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        Contact existingContact = contactRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact not found"));
        modelMapper.map(contactDTO, existingContact);
        Contact updatedContact = contactRepository.save(existingContact);
        return modelMapper.map(updatedContact, ContactDTO.class);
    }

    public void deleteContact(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact not found"));
        contact.setIsActive(false);
        contactRepository.save(contact);
    }

}