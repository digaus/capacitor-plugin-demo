/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Wifi } from '@capacitor-community/wifi';
import { GetUriResult, Directory, Filesystem, Encoding } from '@capacitor/filesystem';
import { Device, DeviceInfo } from '@capacitor/device';



const state: {ssid?: string; ip?: string; loading?: boolean; error?: string; fileUrl?: string} = {};
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public state$: BehaviorSubject<{ssid?: string; ip?: string; loading?: boolean; error?: string; fileUrl?: string}> = new BehaviorSubject(state);

    public ssid: string;
    public password: string;

    private directory: GetUriResult;

    constructor() {}

    public ngOnInit(): void {
        this.initFolder();
    }

    public async connectPrefix(ssid: string, password: string): Promise<void> {
        state.loading = true;
        this.state$.next(state);
        await Wifi.connectPrefix({ ssid, password })
                  .then((res: {ssid: string}) => state.ssid = res.ssid)
                  .catch((err: any) => state.error = err.toString());
        state.loading = false;
        this.state$.next(state);
    }

    public async connect(ssid: string, password: string, isHiddenSsid: boolean = false): Promise<void> {
        state.loading = true;
        this.state$.next(state);
        await Wifi.connect({ ssid, password, isHiddenSsid })
                  .then((res: {ssid: string}) => state.ssid = res.ssid)
                  .catch((err: any) => state.error = err.toString());
        state.loading = false;
        this.state$.next(state);
    }

    public async disconnect(): Promise<void> {
        state.loading = true;
        this.state$.next(state);
        await Wifi.disconnect()
                  .catch((err: any) => state.error = err.toString());
        state.loading = false;
        this.state$.next(state);
    }

    public async getSSID(): Promise<void> {
        state.loading = true;
        this.state$.next(state);
        await Wifi.getSSID()
                  .then((res: {ssid: string}) => state.ssid = res.ssid)
                  .catch((err: any) => state.error = err.toString());
        state.loading = false;
        this.state$.next(state);
    }

    public async getIP(): Promise<void> {
        state.loading = true;
        this.state$.next(state);
        await Wifi.getIP()
                  .then((res: {ip: string}) => state.ip = res.ip)
                  .catch((err: any) => state.error = err.toString());
        state.loading = false;
        this.state$.next(state);
    }

    private async initFolder(): Promise<void> {
        const device: DeviceInfo = await Device.getInfo();
        let baseDirectory: Directory = Directory.Data;
        if (device.operatingSystem === 'mac' || device.operatingSystem === 'windows') {
            baseDirectory = Directory.Documents;
        }
        await Filesystem.mkdir({
            path: 'files',
            directory: baseDirectory,
            recursive: false,
        }).catch((err: any): void => { console.error(err); return null; });
        await Filesystem.writeFile({
            path:  'files/test.txt',
            directory: baseDirectory,
            data: 'This is a test file',
            encoding: Encoding.UTF8,
        });
        this.directory = await Filesystem.getUri({
            path: 'files',
            directory: baseDirectory,
        }).catch((err: any): null => { console.error(err); return null; });
    }
}
