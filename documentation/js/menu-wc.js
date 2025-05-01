'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-74f36a319ec46be6e898195c0c6a9a00abeae8a587c4f067d289e0282062d8b20543e8427786b5d5358e8faede2fca31a17ace9ea5b6dde9d21ee7e2638de8d5"' : 'data-bs-target="#xs-controllers-links-module-AppModule-74f36a319ec46be6e898195c0c6a9a00abeae8a587c4f067d289e0282062d8b20543e8427786b5d5358e8faede2fca31a17ace9ea5b6dde9d21ee7e2638de8d5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-74f36a319ec46be6e898195c0c6a9a00abeae8a587c4f067d289e0282062d8b20543e8427786b5d5358e8faede2fca31a17ace9ea5b6dde9d21ee7e2638de8d5"' :
                                            'id="xs-controllers-links-module-AppModule-74f36a319ec46be6e898195c0c6a9a00abeae8a587c4f067d289e0282062d8b20543e8427786b5d5358e8faede2fca31a17ace9ea5b6dde9d21ee7e2638de8d5"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-74f36a319ec46be6e898195c0c6a9a00abeae8a587c4f067d289e0282062d8b20543e8427786b5d5358e8faede2fca31a17ace9ea5b6dde9d21ee7e2638de8d5"' : 'data-bs-target="#xs-injectables-links-module-AppModule-74f36a319ec46be6e898195c0c6a9a00abeae8a587c4f067d289e0282062d8b20543e8427786b5d5358e8faede2fca31a17ace9ea5b6dde9d21ee7e2638de8d5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-74f36a319ec46be6e898195c0c6a9a00abeae8a587c4f067d289e0282062d8b20543e8427786b5d5358e8faede2fca31a17ace9ea5b6dde9d21ee7e2638de8d5"' :
                                        'id="xs-injectables-links-module-AppModule-74f36a319ec46be6e898195c0c6a9a00abeae8a587c4f067d289e0282062d8b20543e8427786b5d5358e8faede2fca31a17ace9ea5b6dde9d21ee7e2638de8d5"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-6f25ec526494a486b14d7b80288198f421cd3f283912224f0b1309df0fc8ee65f9e96770dbbfa01d22da6ee1fbf73a47f89cda6c3318ee9dfe9caa7c2e1085b8"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-6f25ec526494a486b14d7b80288198f421cd3f283912224f0b1309df0fc8ee65f9e96770dbbfa01d22da6ee1fbf73a47f89cda6c3318ee9dfe9caa7c2e1085b8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-6f25ec526494a486b14d7b80288198f421cd3f283912224f0b1309df0fc8ee65f9e96770dbbfa01d22da6ee1fbf73a47f89cda6c3318ee9dfe9caa7c2e1085b8"' :
                                            'id="xs-controllers-links-module-AuthModule-6f25ec526494a486b14d7b80288198f421cd3f283912224f0b1309df0fc8ee65f9e96770dbbfa01d22da6ee1fbf73a47f89cda6c3318ee9dfe9caa7c2e1085b8"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-6f25ec526494a486b14d7b80288198f421cd3f283912224f0b1309df0fc8ee65f9e96770dbbfa01d22da6ee1fbf73a47f89cda6c3318ee9dfe9caa7c2e1085b8"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-6f25ec526494a486b14d7b80288198f421cd3f283912224f0b1309df0fc8ee65f9e96770dbbfa01d22da6ee1fbf73a47f89cda6c3318ee9dfe9caa7c2e1085b8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-6f25ec526494a486b14d7b80288198f421cd3f283912224f0b1309df0fc8ee65f9e96770dbbfa01d22da6ee1fbf73a47f89cda6c3318ee9dfe9caa7c2e1085b8"' :
                                        'id="xs-injectables-links-module-AuthModule-6f25ec526494a486b14d7b80288198f421cd3f283912224f0b1309df0fc8ee65f9e96770dbbfa01d22da6ee1fbf73a47f89cda6c3318ee9dfe9caa7c2e1085b8"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-20b327fed6807b68f6e9b06abd0bbcb9243b171ce58e94cdf5683beff906005355c3357a47f0a3659bfaebe9b4f960e0d2552e953806763d9f0765384b92ac0e"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-20b327fed6807b68f6e9b06abd0bbcb9243b171ce58e94cdf5683beff906005355c3357a47f0a3659bfaebe9b4f960e0d2552e953806763d9f0765384b92ac0e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-20b327fed6807b68f6e9b06abd0bbcb9243b171ce58e94cdf5683beff906005355c3357a47f0a3659bfaebe9b4f960e0d2552e953806763d9f0765384b92ac0e"' :
                                            'id="xs-controllers-links-module-PostsModule-20b327fed6807b68f6e9b06abd0bbcb9243b171ce58e94cdf5683beff906005355c3357a47f0a3659bfaebe9b4f960e0d2552e953806763d9f0765384b92ac0e"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-20b327fed6807b68f6e9b06abd0bbcb9243b171ce58e94cdf5683beff906005355c3357a47f0a3659bfaebe9b4f960e0d2552e953806763d9f0765384b92ac0e"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-20b327fed6807b68f6e9b06abd0bbcb9243b171ce58e94cdf5683beff906005355c3357a47f0a3659bfaebe9b4f960e0d2552e953806763d9f0765384b92ac0e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-20b327fed6807b68f6e9b06abd0bbcb9243b171ce58e94cdf5683beff906005355c3357a47f0a3659bfaebe9b4f960e0d2552e953806763d9f0765384b92ac0e"' :
                                        'id="xs-injectables-links-module-PostsModule-20b327fed6807b68f6e9b06abd0bbcb9243b171ce58e94cdf5683beff906005355c3357a47f0a3659bfaebe9b4f960e0d2552e953806763d9f0765384b92ac0e"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-501efe9cc83a3648d626cd11bd496dc40d47ed52c54d51a0c62a945a033d2673779550a81d6d3364055b08b3b7dc70f9b59faa3c2fa07c43e214c48d860d22f9"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-501efe9cc83a3648d626cd11bd496dc40d47ed52c54d51a0c62a945a033d2673779550a81d6d3364055b08b3b7dc70f9b59faa3c2fa07c43e214c48d860d22f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-501efe9cc83a3648d626cd11bd496dc40d47ed52c54d51a0c62a945a033d2673779550a81d6d3364055b08b3b7dc70f9b59faa3c2fa07c43e214c48d860d22f9"' :
                                            'id="xs-controllers-links-module-UsersModule-501efe9cc83a3648d626cd11bd496dc40d47ed52c54d51a0c62a945a033d2673779550a81d6d3364055b08b3b7dc70f9b59faa3c2fa07c43e214c48d860d22f9"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-501efe9cc83a3648d626cd11bd496dc40d47ed52c54d51a0c62a945a033d2673779550a81d6d3364055b08b3b7dc70f9b59faa3c2fa07c43e214c48d860d22f9"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-501efe9cc83a3648d626cd11bd496dc40d47ed52c54d51a0c62a945a033d2673779550a81d6d3364055b08b3b7dc70f9b59faa3c2fa07c43e214c48d860d22f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-501efe9cc83a3648d626cd11bd496dc40d47ed52c54d51a0c62a945a033d2673779550a81d6d3364055b08b3b7dc70f9b59faa3c2fa07c43e214c48d860d22f9"' :
                                        'id="xs-injectables-links-module-UsersModule-501efe9cc83a3648d626cd11bd496dc40d47ed52c54d51a0c62a945a033d2673779550a81d6d3364055b08b3b7dc70f9b59faa3c2fa07c43e214c48d860d22f9"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostsMetaOptionsDto.html" data-type="entity-link" >CreatePostsMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPostsParamsDto.html" data-type="entity-link" >GetPostsParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamsDto.html" data-type="entity-link" >GetUserParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IPost.html" data-type="entity-link" >IPost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});