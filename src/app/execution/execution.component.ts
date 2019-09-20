import { Component, OnInit, Input } from '@angular/core';
import { ToolService } from '../tool.service';
import { ToolInfo } from '../tool.model';

@Component({
  selector: 'execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.css']
})
export class ExecutionComponent implements OnInit {
  
  tool: ToolInfo = null
  generatedCommand: string = null
  invocation: string = null
  output: string = null

  constructor(private toolService: ToolService) { }

  ngOnInit() {
  }

  onToolSelected(toolInfo: ToolInfo) {
  	this.tool = toolInfo;
  }

  onInvocationChanged(invocation) {
  	this.invocation = invocation
  	this.toolService.generateCommand(this.tool.id, this.invocation).then((generatedCommand)=> this.generatedCommand = generatedCommand);
  }

  onExecuteTool() {
  	this.toolService.execute(this.tool.id, this.invocation).then((output)=> this.output = output);
  }
}
