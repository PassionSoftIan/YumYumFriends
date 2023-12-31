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
@Table(name = "ENTERINFO")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SessionInfo {
	@Id
	@Column(name = "SESSION_ID")
	private String sessionID;

	@Column(name = "USER_ID")
	private long userID;

	@Column(name = "ROLE")
	private String role;
}
