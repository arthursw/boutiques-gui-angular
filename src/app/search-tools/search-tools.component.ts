import { Component, OnInit } from '@angular/core';
import { ToolInfo } from '../tool.model';

@Component({
  selector: 'search-tools',
  templateUrl: './search-tools.component.html',
  styleUrls: ['./search-tools.component.css']
})
export class SearchToolsComponent implements OnInit {

  selectedTool: ToolInfo

  constructor() { }

  ngOnInit() {
  }

  onSelectTool(toolInfo: ToolInfo) {
  	this.selectedTool = toolInfo;
  }

}
