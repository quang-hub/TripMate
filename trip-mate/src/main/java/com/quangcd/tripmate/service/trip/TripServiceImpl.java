package com.quangcd.tripmate.service.trip;

import com.quangcd.tripmate.entity.Trip;
import com.quangcd.tripmate.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class TripServiceImpl implements TripService {
    private final TripRepository tripRepository;

    @Override
    public Trip findById(Long id) {
        return tripRepository.findById(id).orElse(null);
    }
}
