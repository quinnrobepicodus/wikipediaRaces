import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiTestCallService } from '../api-test-call.service';
import { routing } from '../app.routing';
import * as $ from 'jquery';
import * as dot from 'dot-wild';
import { Game } from '../models/game.model'


@Component({
  selector: 'app-api-test-call',
  templateUrl: './api-test-call.component.html',
  styleUrls: ['./api-test-call.component.css'],
  providers: [ApiTestCallService],


})
export class ApiTestCallComponent implements OnInit {
  article: any[] = null;
  article2: any;

  game: Game = new Game();

  start: string = "";
  end: string = "";

  getArticle(query) {
    this.wikiApiCall.getByPageId(query).subscribe(response => {
      this.article = response.json();
      $("#inputThing").val('');
      let thing = response.json().parse;
      let content = thing.text['*'];
      $("#output").empty();
      $("#output").html(thing.text['*']);
      $("a").click(function() {
        return false;
      })
      let that = this;
      $("a").click(function(event) {
        event.preventDefault();
        let clickedURL = ($(this).attr("href"));
        let clickedLink = clickedURL.substr(clickedURL.lastIndexOf('/') + 1);
        $(".checkDiv").text(clickedLink);
        $("#inputThing").val(clickedLink);
        that.getArticle(clickedLink);
        console.log(that.game);
      })
    });
  }

  constructor(private wikiApiCall: ApiTestCallService, private http: Http) {}

    ngOnInit() {
      let that = this;
      $.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&origin=*&grnnamespace=0&prop=revisions&rvprop=content&grnlimit=1`).then(function(response) {
        const thingTitle = dot.get(response, 'query.pages.*.title')
        const thingId = dot.get(response, 'query.pages.*.pageid')
        let start_thing_title = thingTitle[0];
        let start_thing_id = thingId[0];
        that.game.beginArticle = start_thing_title;
        that.game.beginId = start_thing_id;
        console.log('start article', start_thing_title, start_thing_id)

        $("#beginArticle").val(start_thing_title);


        $.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&origin=*&grnnamespace=0&prop=revisions&rvprop=content&grnlimit=1`).then(function(response) {
          const end_thingTitle = dot.get(response, 'query.pages.*.title')
          const end_thingId = dot.get(response, 'query.pages.*.pageid')
          let end_thing_title = end_thingTitle[0];
          let end_thing_id = end_thingId[0];
          that.game.endArticle = end_thing_title;
          that.game.endId = end_thing_id;

            console.log(that.game)

        })
      })
    }

}
