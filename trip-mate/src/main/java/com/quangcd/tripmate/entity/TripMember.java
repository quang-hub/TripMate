package com.quangcd.tripmate.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "trip_members")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripMember extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tripId;

    private Long userId;

}

