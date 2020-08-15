import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { GalleryService } from '../service/gallery.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  gallery_display = true
  Open_gallery_display = true
  thumbnail_display = false

  p: number = 1;

  searchResult 
  
  userId = 0

  displayImage = false

  galleryTitle

  albumResult 

  dataArr

  items: GalleryItem[];

  galleryDet 

  constructor(public gallery: Gallery, public lightbox: Lightbox, private galleryService:GalleryService) {
  }
  ngOnInit(): void {
      //service get Gallery Title
      this.galleryService.getGalleryTitle().subscribe((results) => {
        this.galleryTitle = results;

       // creates array of array
        this.dataArr = this.galleryTitle.map(item=>{
          return [item.userId,item]
      });

      // create key value pair from array of array
      var maparr = new Map(this.dataArr); 
      
      //converting back to array from mapobject
      this.albumResult = [...maparr.values()];
      })
    }

   

  getId(id)
  {
    //get Album Id to Display Thumbnail
    this.displayImage = true
    this.userId = id
    this.galleryService.getGalleryDetails().subscribe((result) => {
      this.galleryDet = result;

     this.searchResult = this.galleryDet.filter( ({ albumId }) => albumId == this.userId );
   
     this.gallery_display = false
     this.Open_gallery_display = false
     this.thumbnail_display = true
   
     return this.searchResult      
  
    })

  }
  back(){
    this.gallery_display = true
    this.Open_gallery_display = false
    this.thumbnail_display = false
  }
}




