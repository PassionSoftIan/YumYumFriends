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
@Table(name = "MYYUM")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MyYum {
	@Id
	@Column(name = "USER_ID")
	private int userID;

	@Column(name = "YUM_ID")
	private int yumID;
}
