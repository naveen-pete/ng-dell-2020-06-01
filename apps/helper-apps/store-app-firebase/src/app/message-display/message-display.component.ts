import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css']
})
export class MessageDisplayComponent implements OnInit {
  @Input() parent: string;
  @Input() success: boolean;
  @Input() data: any;
  @Output() clearMessage = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClear() {
    this.clearMessage.emit();
  }

}
