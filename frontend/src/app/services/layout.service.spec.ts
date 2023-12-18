import { TestBed } from '@angular/core/testing';

import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateInitialPositionParent', () => {
    it('should return a Coordinates object', () => {
      const result = service.calculateInitialPositionParent();
      expect(result).toBeTruthy();
      expect(result).toEqual(jasmine.any(Object));
      expect(result.x).toBeDefined();
      expect(result.y).toBeDefined();
    });
  
    it('should call getTextBoxPosition once', () => {
      spyOn(service, 'getTextBoxPosition');
      service.calculateInitialPositionParent();
      expect(service.getTextBoxPosition).toHaveBeenCalledTimes(1);
    });
  
    it('should call getTextBoxSize once', () => {
      spyOn(service, 'getTextBoxSize');
      service.calculateInitialPositionParent();
      expect(service.getTextBoxSize).toHaveBeenCalledTimes(1);
    });
  
    it('should call calculateQuadrantStartPosition at most 4 times', () => {
      spyOn(service, 'calculateQuadrantStartPosition');
      service.calculateInitialPositionParent();
      expect(service.calculateQuadrantStartPosition).toHaveBeenCalledTimes(4);
    });
  
    it('should call isWithinBounds at most 1000 times', () => {
      spyOn(service, 'isWithinBounds');
      service.calculateInitialPositionParent();
      expect(service.isWithinBounds).toHaveBeenCalledTimes(1000);
    });
  
    it('should call getAvailablePositions at most 1000 times', () => {
      spyOn(service, 'getAvailablePositions');
      service.calculateInitialPositionParent();
      expect(service.getAvailablePositions).toHaveBeenCalledTimes(1000);
    });
  
    it('should call selectPosition once', () => {
      spyOn(service, 'selectPosition');
      service.calculateInitialPositionParent();
      expect(service.selectPosition).toHaveBeenCalledTimes(1);
    });
  });
});
