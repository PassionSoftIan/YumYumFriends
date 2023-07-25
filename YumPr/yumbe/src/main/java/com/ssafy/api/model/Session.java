package com.ssafy.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "SESSION")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Session {
	@Id
	@Column(name = "ID")
	private String sessionID;

	@Column(name = "PASSWORD")
	private String password;

	@Column(name = "MAX")
	private int max;

	@Column(name = "CURRENT")
	private int current;

	@Column(name = "MODE")
	private String mode;
	
}
