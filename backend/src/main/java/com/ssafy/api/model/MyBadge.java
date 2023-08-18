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
@Table(name = "MYTROPHY")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MyBadge {
	@Id
	@Column(name = "USER_ID")
	private long userID;

	@Column(name = "BADGE_ID")
	private long badgeID;
}
