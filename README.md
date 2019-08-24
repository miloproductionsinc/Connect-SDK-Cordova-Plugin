# Connect SDK Cordova/PhoneGap Plugin

Connect SDK is an open source framework that unifies device discovery and connectivity by providing one set of methods that work across multiple television platforms and protocols.

For more information, visit our [website](http://www.connectsdk.com/).

* [General information about Connect SDK](http://www.connectsdk.com/discover/)
* [Platform documentation & FAQs](http://www.connectsdk.com/docs/cordova/)
* [API documentation](http://www.connectsdk.com/apis/cordova/)

## Dependencies

These steps assume you have a basic working knowledge of development for Android, iOS and Cordova/PhoneGap. For these steps to work, you will need the following:

- Cordova/PhoneGap (5.0+)
- Xcode & Command Line Tools
- Android SDK

If you are only developing for one platform, feel free to ignore the steps & requirements for the irrelevant platform.

## Installation for Cordova/PhoneGap

```
    cordova plugin add cordova-plugin-connectsdk
```
Or for a specific version, such as 1.6.0
```
    cordova plugin add cordova-plugin-connectsdk@1.6.0
``` 
You can also install a specific branch from Github (e.g. to install versions older than 1.6.0), such as sdk_1.3
```
    cordova plugin add https://github.com/ConnectSDK/Connect-SDK-Cordova-Plugin.git#sdk_1.3
    
```

###Permissions to include in manifest
* Required for SSDP & Chromecast/Zeroconf discovery
 - `android.permission.INTERNET`
 - `android.permission.CHANGE_WIFI_MULTICAST_STATE`
* Required for interacting with devices
 - `android.permission.ACCESS_NETWORK_STATE`
 - `android.permission.ACCESS_WIFI_STATE`
* Required for storing device pairing information
 - `android.permission.WRITE_EXTERNAL_STORAGE`

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.CHANGE_WIFI_MULTICAST_STATE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## Troubleshooting

* To update the plugin, you'll need to remove and re-add the plugin

```
    cordova plugin remove cordova-plugin-connectsdk
    cordova plugin add cordova-plugin-connectsdk
```

* If you're using an older version of the ConnectSDK Cordova plugin than 1.6.0, we changed the plugin id for npm publishing. You'll need to remove the plugin using the old id, and add it with the new id.

```
    cordova plugin remove com.connectsdk.cordovaplugin
    cordova plugin add cordova-plugin-connectsdk
```

###Proguard configuration
Add the following line to your proguard configuration file (otherwise `DiscoveryManager` won't be able to set any `DiscoveryProvider`).

```
-keep class com.connectsdk.**       { * ; }
```
###Metadata for application tag
This metadata tag is necessary to enable Chromecast support.

```xml
<application ... >
    ...

    <meta-data
        android:name="com.google.android.gms.version"
        android:value="@integer/google_play_services_version" />

</application>
```

##Limitations/Caveats

###Subtitles Android

- DLNA service support `SRT` format only. Since there is no official specification for them, subtitles may not work on all DLNA-compatible devices. This feature has been tested and works on LG WebOS and Netcast TVs.
- FireTV service supports `WebVTT` format only. Subtitles on Fire TV are hidden by default. To display them, the user should manually pick one in the media player (click the "Options" button on the remote). The Fling SDK doesn't provide any way to make them appear remotely.
- Google Cast service supports `WebVTT` format only. Servers providing subtitles and media files should support CORS headers, otherwise they are not displayed. The simplest change is to send this HTTP response header for your subtitles: `Access-Control-Allow-Origin: *`. More information is here: [https://developers.google.com/cast/docs/android_sender#cors-requirements](https://developers.google.com/cast/docs/android_sender#cors-requirements).
- Netcast service support `SRT` format only. It uses DLNA and has the same restrictions as DLNA service.
- WebOS service supports `WebVTT` format only. The server providing subtitles should support CORS headers, similarly to Cast service's requirements.

###Tests
Connect SDK has unit tests for some parts of the code, and we are continuing to increase the test coverage.
These tests are based on third party libraries such as Robolectric, Mockito and PowerMock. You can easily run these tests with Gradle:
```
gradle test
```
Also the project has a target for generating test coverage report with Jacoco. Use this command for generating it.
```
gradle jacocoTestReport
```
The test coverage report will be in this folder `Connect-SDK-Android/build/reports/jacoco/jacocoTestReport/html`.

##Credits
Connect SDK for Android makes use of the following projects, some of which are open-source.

* [Amazon Fling SDK](https://developer.amazon.com/fling)
  - [Amazon Fling SDK Terms of Service](https://developer.amazon.com/public/support/pml.html)
* [Android-DLNA](https://code.google.com/p/android-dlna/) (Apache License, Version 2.0)
* [Google Cast SDK](https://developers.google.com/cast/)
  - [Google Cast SDK Additional Developer Terms of Service](https://developers.google.com/cast/docs/terms)
  - [Google APIs Terms of Service](https://developers.google.com/terms/)
* [Java-WebSocket](https://github.com/TooTallNate/Java-WebSocket) (MIT)
* [JmDNS](http://jmdns.sourceforge.net) (Apache License, Version 2.0)

These projects are used in tests:
* [Mockito](http://mockito.org/) (MIT)
* [Robolectric](http://robolectric.org) (MIT)
* [PowerMock](https://github.com/jayway/powermock) (Apache License, Version 2.0)
* [XMLUnit](http://www.xmlunit.org/) (Apache License, Version 2.0)

## Contact
* Twitter [@ConnectSDK](https://www.twitter.com/ConnectSDK)
* Ask a question with the "tv" tag on [Stack Overflow](http://stackoverflow.com/tags/tv)
* General Inquiries info@connectsdk.com
* Developer Support support@connectsdk.com
* Partnerships partners@connectsdk.com

## License

Copyright (c) 2013-2015 LG Electronics.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
