import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Song {
    id?: number;
    index?: number,
    title: string;
    lyrics?: string,
    chord?: string,
    link?: string;
    isFavorite?: boolean;
}

const API_URL = environment.endpoint + 'api/song/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root'
})
export class SongService {

    constructor(private http: HttpClient) { }

    getSongs(): Observable<Song[]> {
        return this.http.get<Song[]>(API_URL + 'allSongs');
    }

    createSong(song: Song): Observable<Song> {
        return this.http.post<Song>(API_URL + 'createSong', song, httpOptions);
    }

    getSongById(songId: string): Observable<Song> {
        return this.http.get<Song>(API_URL + `getSongById/${songId}`);
    }

    deleteSongById(songId: string): Observable<any> {
        return this.http.delete(API_URL + `deleteSongById/${songId}`);
    }
    updateSong(songId: string, song: Song): Observable<Song> {
        return this.http.put<Song>(API_URL + `updateSong/${songId}`, song, httpOptions);
    }
}
