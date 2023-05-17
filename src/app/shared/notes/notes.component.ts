import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/core/storage';
import { noteList } from '../interface/interface';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  noteList: noteList[] = [];
  newNote = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
  })
  clickedNote!: noteList | null;
  clickedTitle!: string;
  clickedBody!: string;
  revertNote!: noteList | null;
  disablebtn = true;

  constructor(private storage: StorageService) { }

  clearNote() {
    this.clickedNote = null;
    this.clickedTitle = "";
    this.clickedBody = "";
    this.revertNote = null;
    this.newNote.reset();
    this.onChange();
  }

  targetNote(note: noteList) {
    this.clickedNote = note;
    this.clickedTitle = note.title;
    this.clickedBody = note.body;
    this.revertNote = { title: note.title, body: note.body };
    this.newNote.controls['title'].setValue(note.title);
    this.newNote.controls['body'].setValue(note.body);
    this.onChange();
  }

  removeNote(note: noteList) {
    console.log(note);
    this.storage.removeNote("notes", note);
    this.noteList = this.storage.getNote("notes");
  }

  onRevert() {
    this.newNote.controls['title'].setValue(this.revertNote!.title);
    this.newNote.controls['body'].setValue(this.revertNote!.body);
    this.onChange();
    alert('Note was reverted');
  }

  onChange() {
    const changeTitle = this.newNote.controls['title'].value !== this.clickedTitle;
    const changeBody = this.newNote.controls['body'].value !== this.clickedBody;

    if (changeTitle || changeBody) {
      this.disablebtn = false;
    } else {
      this.disablebtn = true;
    }
  }

  onSubmit() {
    if (!this.disablebtn) {
      const tempNote: noteList = {
        title: this.newNote.value.title,
        body: this.newNote.value.body,
      };
      
      const exist = this.noteList.findIndex(ele => ele.title === tempNote.title);
      if (exist != -1) {
        this.noteList[exist] = tempNote;
        alert('Note was updated with same title');
      } else {
        this.noteList.push(tempNote);
        alert('Note was saved');
      }
      this.storage.setNote('notes', this.noteList);
    }
    this.clearNote();
  }

  ngOnInit() {
    if (this.storage.getNote("notes") == '' || null || undefined) {
      this.storage.setNote("notes", this.noteList);
    } else {
      this.noteList = this.storage.getNote("notes");
    }
  }
}
