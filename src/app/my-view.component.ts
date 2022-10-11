import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {VyzeService} from 'ng-vyze';
import {Id} from "vyze";

@Component({
  templateUrl: './my-view.component.html',
  styleUrls: ['./my-view.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyViewComponent implements OnInit {

  @Input()
  /**
   * Universe name containing all models.
   */
  public universe?: string;

  @Input()
  /**
   * Layer profile containing spaces.
   */
  public profile?: string;

  @Input()
  /**
   * Service token granting access to VYZE services such as universe modelling or layer profile token generation.
   */
  public token?: string;

  @Input()
  public set context(context: string | undefined) {
    this._context = context;
    this.reload();
  }
  /**
   * Context of this component containing an id or a list of ids.
   */
  public get context(): string | undefined {
    return this._context;
  }
  private _context?: string;

  public name = 'My View';

  public contextId?: Id;
  public contextIds?: Id[];

  constructor(public vyze: VyzeService) {
  }

  async ngOnInit(): Promise<void> {
    this.vyze.service.setToken(this.token);

    if (this.universe) {
      // Load universe
      await this.vyze.loadUniverse(this.universe);
    }

    // Load profile
    if (this.profile) {
      await this.vyze.loadProfile(this.profile);
    }
  }

  async reload() {
    if (!this.context) {
      return;
    }
    const context = JSON.parse(this.context);
    if (typeof context === 'string') {
      this.contextId = context;
    } else if (Array.isArray(context)) {
      this.contextIds = context;
    }
  }

}
