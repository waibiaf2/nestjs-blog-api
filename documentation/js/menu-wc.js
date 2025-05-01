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
                                            'data-bs-target="#controllers-links-module-AppModule-8eb80f0f27e88a389e1d6715887d9efaabad86e7ea4668f77be7c811ec771292b54d8df58c6b9be629da586cb3838ba4eb0f725e4ddd053df19c9e5f865fe9bc"' : 'data-bs-target="#xs-controllers-links-module-AppModule-8eb80f0f27e88a389e1d6715887d9efaabad86e7ea4668f77be7c811ec771292b54d8df58c6b9be629da586cb3838ba4eb0f725e4ddd053df19c9e5f865fe9bc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-8eb80f0f27e88a389e1d6715887d9efaabad86e7ea4668f77be7c811ec771292b54d8df58c6b9be629da586cb3838ba4eb0f725e4ddd053df19c9e5f865fe9bc"' :
                                            'id="xs-controllers-links-module-AppModule-8eb80f0f27e88a389e1d6715887d9efaabad86e7ea4668f77be7c811ec771292b54d8df58c6b9be629da586cb3838ba4eb0f725e4ddd053df19c9e5f865fe9bc"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-8eb80f0f27e88a389e1d6715887d9efaabad86e7ea4668f77be7c811ec771292b54d8df58c6b9be629da586cb3838ba4eb0f725e4ddd053df19c9e5f865fe9bc"' : 'data-bs-target="#xs-injectables-links-module-AppModule-8eb80f0f27e88a389e1d6715887d9efaabad86e7ea4668f77be7c811ec771292b54d8df58c6b9be629da586cb3838ba4eb0f725e4ddd053df19c9e5f865fe9bc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-8eb80f0f27e88a389e1d6715887d9efaabad86e7ea4668f77be7c811ec771292b54d8df58c6b9be629da586cb3838ba4eb0f725e4ddd053df19c9e5f865fe9bc"' :
                                        'id="xs-injectables-links-module-AppModule-8eb80f0f27e88a389e1d6715887d9efaabad86e7ea4668f77be7c811ec771292b54d8df58c6b9be629da586cb3838ba4eb0f725e4ddd053df19c9e5f865fe9bc"' }>
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
                                            'data-bs-target="#controllers-links-module-PostsModule-4656576e84d9495a0db899dddb1f2e4924df83a778975d354378f7cd75bce1eb99b4f95cb66fa0322d895bc7f66193b5f6544e8b900e42942e6f556ed39292ca"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-4656576e84d9495a0db899dddb1f2e4924df83a778975d354378f7cd75bce1eb99b4f95cb66fa0322d895bc7f66193b5f6544e8b900e42942e6f556ed39292ca"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-4656576e84d9495a0db899dddb1f2e4924df83a778975d354378f7cd75bce1eb99b4f95cb66fa0322d895bc7f66193b5f6544e8b900e42942e6f556ed39292ca"' :
                                            'id="xs-controllers-links-module-PostsModule-4656576e84d9495a0db899dddb1f2e4924df83a778975d354378f7cd75bce1eb99b4f95cb66fa0322d895bc7f66193b5f6544e8b900e42942e6f556ed39292ca"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-4656576e84d9495a0db899dddb1f2e4924df83a778975d354378f7cd75bce1eb99b4f95cb66fa0322d895bc7f66193b5f6544e8b900e42942e6f556ed39292ca"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-4656576e84d9495a0db899dddb1f2e4924df83a778975d354378f7cd75bce1eb99b4f95cb66fa0322d895bc7f66193b5f6544e8b900e42942e6f556ed39292ca"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-4656576e84d9495a0db899dddb1f2e4924df83a778975d354378f7cd75bce1eb99b4f95cb66fa0322d895bc7f66193b5f6544e8b900e42942e6f556ed39292ca"' :
                                        'id="xs-injectables-links-module-PostsModule-4656576e84d9495a0db899dddb1f2e4924df83a778975d354378f7cd75bce1eb99b4f95cb66fa0322d895bc7f66193b5f6544e8b900e42942e6f556ed39292ca"' }>
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
                                            'data-bs-target="#controllers-links-module-UsersModule-9559f5c08e589d4638bb57b0857ad968b8030d58976a4f7cbecf569f6cf12a6927b06a25e8dfa4a2911aff46fb881697a63f869a8f960deb55d87ffd936b04dc"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-9559f5c08e589d4638bb57b0857ad968b8030d58976a4f7cbecf569f6cf12a6927b06a25e8dfa4a2911aff46fb881697a63f869a8f960deb55d87ffd936b04dc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-9559f5c08e589d4638bb57b0857ad968b8030d58976a4f7cbecf569f6cf12a6927b06a25e8dfa4a2911aff46fb881697a63f869a8f960deb55d87ffd936b04dc"' :
                                            'id="xs-controllers-links-module-UsersModule-9559f5c08e589d4638bb57b0857ad968b8030d58976a4f7cbecf569f6cf12a6927b06a25e8dfa4a2911aff46fb881697a63f869a8f960deb55d87ffd936b04dc"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-9559f5c08e589d4638bb57b0857ad968b8030d58976a4f7cbecf569f6cf12a6927b06a25e8dfa4a2911aff46fb881697a63f869a8f960deb55d87ffd936b04dc"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-9559f5c08e589d4638bb57b0857ad968b8030d58976a4f7cbecf569f6cf12a6927b06a25e8dfa4a2911aff46fb881697a63f869a8f960deb55d87ffd936b04dc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-9559f5c08e589d4638bb57b0857ad968b8030d58976a4f7cbecf569f6cf12a6927b06a25e8dfa4a2911aff46fb881697a63f869a8f960deb55d87ffd936b04dc"' :
                                        'id="xs-injectables-links-module-UsersModule-9559f5c08e589d4638bb57b0857ad968b8030d58976a4f7cbecf569f6cf12a6927b06a25e8dfa4a2911aff46fb881697a63f869a8f960deb55d87ffd936b04dc"' }>
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