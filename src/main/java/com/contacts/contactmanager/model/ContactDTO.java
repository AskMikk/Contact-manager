package com.contacts.contactmanager.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactDTO {

    private Long id;
    private String realName;
    private String codeName;
    private String phoneNumber;
    private Boolean isActive;

}