import { Component, ElementRef, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { BreadcrumbsService } from './breadcrumbs/breadcrumbs.service';
import { ModalService } from './shared/components/modals/modal.service';
import { ServiceLocator } from './utils/locator.service';
import { InvocationComponent } from './invocation/invocation.component';
import { ExecutionComponent } from './execution/execution.component';
import { ToolInfo } from './tool.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(InvocationComponent, {static: false})
  private invocationComponent: InvocationComponent;

  @ViewChild(ExecutionComponent, {static: false})
  private executionComponent: ExecutionComponent;

  constructor(
      public viewContainerRef: ViewContainerRef,
      private modalService: ModalService,
      private breadcrumbsService: BreadcrumbsService) {
    
    this.modalService.rootViewCRef = this.viewContainerRef;
    ServiceLocator.rootViewContainerRef = this.viewContainerRef;
  }

  ngAfterViewInit() {
  }

  onToolSelected(toolInfo: ToolInfo) {
    this.invocationComponent.onToolSelected(toolInfo);
    this.executionComponent.onToolSelected(toolInfo);
  }
}
