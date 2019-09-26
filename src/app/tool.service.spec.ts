import { asyncData, asyncError } from './testing/index';
import { HttpErrorResponse } from '@angular/common/http';

import { TestBed } from '@angular/core/testing';

import { ToolService } from './tool.service';
import { ToolInfo } from './tool.model';

describe('ToolService', () => {      

  let httpClientSpy: { get: jasmine.Spy };

  let service: ToolService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ToolService(<any> httpClientSpy);
  });

  it('should return expected tools (HttpClient called once)', () => {
    const expectedTools: any[] = [{ id: 1, name: 'A', description: 'Description A', nDownloads: 50 }, { id: 2, name: 'B', description: 'Description B', nDownloads: 51 }];

    httpClientSpy.get.and.returnValue(asyncData(expectedTools));

    service.getAll().then(
      tools => expect(tools).toEqual(expectedTools, 'expected tools'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should be created', () => {
    const service: ToolService = TestBed.get(ToolService);
    expect(service).toBeTruthy();
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    service.getAll().then(
      tools => fail('expected an error, not tools'),
      error => expect(error.message).toContain('test 404 error')
    );
  });
});
