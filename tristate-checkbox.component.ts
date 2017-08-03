import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { asEnumerable } from 'linq-es5';
@Component({
    selector: 'tristate-checkbox',
    templateUrl: './tristate-checkbox.component.html'
})

export class TriStateCheckboxComponent implements OnInit {

    @Input() listItems: any[];
    @Output() onSelected = new EventEmitter<string>();
    constructor() {
    }

    public get allSelected(): boolean {
        return asEnumerable(this.listItems).All(i => i.isSelected);
    }
    public get noneSelected(): boolean {
        return asEnumerable(this.listItems).All(i => !i.isSelected);
    }
    public get someSelected(): boolean {
        return asEnumerable(this.listItems).Any(i => i.isSelected) && !this.allSelected;
    }
    public onClick(): void {
        if (this.allSelected) {
            this.listItems.forEach(i => i.isSelected = false);
            return;
        }
        if (this.noneSelected || this.someSelected)
            this.listItems.forEach(i => i.isSelected = true);
    }

    ngOnInit() {

    }
}
