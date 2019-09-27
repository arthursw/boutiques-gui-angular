import { asyncData, asyncError } from './testing/index';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { TestBed } from '@angular/core/testing';

import { ToolService } from './tool.service';
import { ToolInfo } from './tool.model';

describe('ToolService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test
      providers: [ ToolService ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ToolService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#getAll', () => {
    let expectedTools: ToolInfo[];

    beforeEach(() => {
      service = TestBed.get(ToolService);
      expectedTools = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
       ] as ToolInfo[];
    });

    it('should return expected tool', () => {
      service.getAll().then(
        tools => expect(tools).toEqual(expectedTools, 'should return expected tools'),
        fail
      );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(service.API_URL + '/all');
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedTools);
    });

    it('should be OK returning no tool', () => {
      service.getAll().then(
        tools => expect(tools.length).toEqual(0, 'should have empty tool array'),
        fail
      );

      const req = httpTestingController.expectOne(service.API_URL + '/all');
      req.flush([]); // Respond with no heroes
    });

    it('should turn 404 into a user-friendly error', () => {
      const message = 'Deliberate 404';
      service.getAll().then(
        tools => fail('expected to fail'),
        error => expect(error.error).toContain(message)
      );

      const req = httpTestingController.expectOne(service.API_URL + '/all');

      // respond with a 404 and the error message in the body
      req.flush(message, {status: 404, statusText: 'Not Found'});
    });

  });

  describe('#getDescriptor', () => {
    let expectedDescriptor = { name: 'fake descriptor'};
    let toolId = Math.random();

    beforeEach(() => {
      service = TestBed.get(ToolService);
    });

    it('should return expected tool descriptor', () => {
      service.getDescriptor(toolId).then(
        descriptor => expect(descriptor).toEqual(expectedDescriptor, 'should return expected descriptor'),
        fail
      );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(`${service.API_URL}/${encodeURIComponent(toolId)}/descriptor/`);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedDescriptor);
    });

    it('should turn 404 into a user-friendly error', () => {
      const message = 'Deliberate 404';
      service.getDescriptor(toolId).then(
        tools => fail('expected to fail'),
        error => expect(error.error).toContain(message)
      );

      const req = httpTestingController.expectOne(`${service.API_URL}/${encodeURIComponent(toolId)}/descriptor/`);

      // respond with a 404 and the error message in the body
      req.flush(message, {status: 404, statusText: 'Not Found'});
    });

  });

  describe('#getInvocation', () => {
    let expectedInvocation = 'fake invocation';
    let toolId = Math.random();

    beforeEach(() => {
      service = TestBed.get(ToolService);
    });

    it('should return expected tool invocation', () => {
      service.getInvocation(toolId).then(
        invocation => expect(invocation).toEqual(expectedInvocation, 'should return expected invocation'),
        fail
      );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(`${service.API_URL}/${encodeURIComponent(toolId)}/invocation/`);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedInvocation);
    });

    it('should turn 404 into a user-friendly error', () => {
      const message = 'Deliberate 404';
      service.getInvocation(toolId).then(
        tools => fail('expected to fail'),
        error => expect(error.error).toContain(message)
      );

      const req = httpTestingController.expectOne(`${service.API_URL}/${encodeURIComponent(toolId)}/invocation/`);

      // respond with a 404 and the error message in the body
      req.flush(message, {status: 404, statusText: 'Not Found'});
    });

  });

  describe('#generateCommand', () => {
    let fakeInvocation = 'fake invocation';
    let expectedCommand = 'fake command';
    let toolId = Math.random();

    beforeEach(() => {
      service = TestBed.get(ToolService);
    });

    it('should return expected generated command', () => {
      service.generateCommand(toolId, fakeInvocation).then(
        command => expect(command).toEqual(expectedCommand, 'should return expected generated command'),
        fail
      );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(`${service.API_URL}/${encodeURIComponent(toolId)}/generate-command/`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(fakeInvocation);
      expect(req.request.responseType).toEqual('text');

      // Respond with the mock heroes
      req.flush(expectedCommand);
    });

    it('should turn 404 into a user-friendly error', () => {
      const message = 'Deliberate 404';
      service.generateCommand(toolId, fakeInvocation).then(
        tools => fail('expected to fail'),
        error => expect(error.error).toContain(message)
      );

      const req = httpTestingController.expectOne(`${service.API_URL}/${encodeURIComponent(toolId)}/generate-command/`);

      // respond with a 404 and the error message in the body
      req.flush(message, {status: 404, statusText: 'Not Found'});
    });

  });

  describe('#execute', () => {
    let fakeInvocation = 'fake invocation';
    let expectedOutput = 'fake output';
    let toolId = Math.random();

    beforeEach(() => {
      service = TestBed.get(ToolService);
    });

    it('should return expected resulting output', () => {
      service.execute(toolId, fakeInvocation).then(
        output => expect(output).toEqual(expectedOutput, 'should return expected resulting output'),
        fail
      );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(`${service.API_URL}/${encodeURIComponent(toolId)}/execute/`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(fakeInvocation);
      expect(req.request.responseType).toEqual('text');

      // Respond with the mock heroes
      req.flush(expectedOutput);
    });

    it('should turn 404 into a user-friendly error', () => {
      const message = 'Deliberate 404';
      service.execute(toolId, fakeInvocation).then(
        tools => fail('expected to fail'),
        error => expect(error.error).toContain(message)
      );

      const req = httpTestingController.expectOne(`${service.API_URL}/${encodeURIComponent(toolId)}/execute/`);

      // respond with a 404 and the error message in the body
      req.flush(message, {status: 404, statusText: 'Not Found'});
    });

  });


});
