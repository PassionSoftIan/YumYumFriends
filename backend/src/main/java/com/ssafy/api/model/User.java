package com.ssafy.api.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

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
	@DateTimeFormat(pattern = "YYYY-MM-DD")
	private Date mealLast;
	
	@Column(name = "CURRENT_YUM")
	private long currentYum;
	
}
