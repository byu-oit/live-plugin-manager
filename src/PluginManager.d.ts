/// <reference types="node" />
import { PackageInfo } from "./NpmRegistryClient";
import { PluginInfo, IPluginInfo } from "./PluginInfo";
export interface PluginManagerOptions {
    cwd: string;
    pluginsPath: string;
    sandbox: any;
    npmRegistryUrl: string;
    npmRegistryConfig: any;
    requireCoreModules: boolean;
    hostRequire?: NodeRequire;
    ignoredDependencies: Array<string | RegExp>;
    staticDependencies: {
        [key: string]: any;
    };
}
export interface InstallFromPathOptions {
    force: boolean;
}
export declare class PluginManager {
    readonly options: PluginManagerOptions;
    private readonly vm;
    private readonly installedPlugins;
    private readonly npmRegistry;
    constructor(options?: Partial<PluginManagerOptions>);
    /**
     * Install a package from npm
     * @param name name of the package
     * @param version version of the package, default to "latest"
     */
    installFromNpm(name: string, version?: string): Promise<IPluginInfo>;
    /**
     * Install a package from a local folder
     * @param location package local folder location
     * @param options options, if options.force == true then package is always reinstalled without version checking
     */
    installFromPath(location: string, options?: Partial<InstallFromPathOptions>): Promise<IPluginInfo>;
    /**
     * Install a package by specifiing code directly. If no version is specified it will be always reinstalled.
     * @param name plugin name
     * @param code code to be loaded, equivalent to index.js
     * @param version optional version, if omitted no version check is performed
     */
    installFromCode(name: string, code: string, version?: string): Promise<IPluginInfo>;
    uninstall(name: string): Promise<void>;
    uninstallAll(): Promise<void>;
    list(): IPluginInfo[];
    require(name: string): any;
    alreadyInstalled(name: string, version?: string): IPluginInfo | undefined;
    getInfo(name: string): IPluginInfo | undefined;
    getInfoFromNpm(name: string, version?: string): Promise<PackageInfo>;
    runScript(code: string): any;
    getFullInfo(name: string): PluginInfo | undefined;
    private uninstallLockFree(name);
    private installFromPathLockFree(location, options);
    private installFromNpmLockFree(name, version?);
    private installFromCodeLockFree(name, code, version?);
    private installDependencies(packageInfo);
    private unloadWithDependents(plugin);
    private isModuleAvailableFromHost(name);
    private isValidPluginName(name);
    private getPluginLocation(name);
    private removeDownloaded(name);
    private isAlreadyDownloaded(name, version);
    private readPackageJsonFromPath(location);
    private load(plugin);
    private unload(plugin);
    private addPlugin(packageInfo);
    private deleteAndUnloadPlugin(plugin);
    private syncLock();
    private syncUnlock();
    private shouldIgnore(name);
}
