import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToolDescriptorInfoComponent } from '../tool-descriptor-info/tool-descriptor-info.component';
import { ToolInfo } from '../tool.model';
import { ToolService } from '../tool.service';

@Component({
  selector: 'invocation',
  templateUrl: './invocation.component.html',
  styleUrls: ['./invocation.component.css']
})
export class InvocationComponent implements OnInit {
  
  tool: ToolInfo = null
  
  @Output() invocationChanged = new EventEmitter<any>();

  descriptor: any = null
  
  invocation: any = null
  invocationChangedTimeoutID: any = null

  constructor(private toolService: ToolService) { }

  ngOnInit() {
  }

  onToolSelected(toolInfo: ToolInfo) {
    this.tool = toolInfo
    this.toolService.getDescriptor(this.tool.id).then((descriptor)=> this.descriptor = descriptor);
    this.toolService.getInvocation(this.tool.id).then((invocation)=> {
      this.invocation = invocation;
      this.invocationChanged.emit(this.invocation);
    });
  }

  get invocationValue() {
    return this.invocation ? JSON.stringify(this.invocation, null, 2) : '';
  }

  set invocationValue(v) {
    try{
      this.invocation = JSON.parse(v);
      clearTimeout(this.invocationChangedTimeoutID);
      this.invocationChangedTimeoutID = setTimeout(()=> this.invocationChanged.emit(this.invocation), 1000);
    } catch(e) {
      console.log('error occored while you were typing the JSON');
    };
  }

}
