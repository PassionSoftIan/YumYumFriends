package com.ssafy.api.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "USER")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class User {

	@Id
	@Column(name = "ID")
	private long ID;

	@Column(name = "EMAIL")
	private String email;

	@Column(name = "NICKNAME")
	private String nickname;

	@Column(name = "MEAL_REMAIN")
	private int mealRemain;

	@Column(name = "MEAL_LAST")
	private Date mealLast;
	
}
