import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToolInfo } from '../tool.model';
import { ToolService } from '../tool.service';

@Component({
  selector: 'invocation',
  templateUrl: './invocation.component.html',
  styleUrls: ['./invocation.component.css']
})
export class InvocationComponent implements OnInit {
  
  tool: ToolInfo = null
  
  @Output() invocationChanged = new EventEmitter<string>();

  descriptor: any = null
  invocation: string = null

  constructor(private toolService: ToolService) { }

  ngOnInit() {
  }

  onToolSelected(toolInfo: ToolInfo) {
    this.tool = toolInfo
    this.toolService.getDescriptor(this.tool.id).then((descriptor)=> this.descriptor = descriptor);
    this.toolService.getInvocation(this.tool.id).then((invocation)=> this.invocation = invocation);
  }

  get invocationValue() {
    return JSON.stringify(this.invocation, null, 2);
  }

  set invocationValue(v) {
    try{
      this.invocation = JSON.parse(v);
      this.invocationChanged.emit(this.invocation);
    } catch(e) {
      console.log('error occored while you were typing the JSON');
    };
  }

}
