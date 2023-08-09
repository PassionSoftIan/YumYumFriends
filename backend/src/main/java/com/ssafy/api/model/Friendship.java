package com.ssafy.api.model;

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
@Table(name = "FRIEND")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Friendship {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private long ID;

	@Column(name = "FRIEND1_ID")
	private long friend1ID;

	@Column(name = "FRIEND2_ID")
	private long friend2ID;

}
