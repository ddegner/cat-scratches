In January, we introduced our Nightly package for RPM-based Linux distributions. Today, we are thrilled to announce it is now available for Firefox Beta!

Firefox Beta is great for testing your sites in a version of Firefox that will reach regular users in the coming weeks. If you find any issues, please file them on Bugzilla.

Switching to Mozilla’s RPM repository allows Firefox Beta to be installed and updated like any other application, using your favorite package manager. It also provides a number of improvements:

*  Better performance thanks to our advanced compiler-based optimizations,
* Updates as fast as possible because the .rpm management is integrated into Firefox’s release process,
* Hardened binaries with all security flags enabled during compilation,
* No need to create your own .desktop file.

If you have Mozilla’s RPM repository already set up, you can simply install Firefox Beta with your package manager. Otherwise, follow the setup steps below.

#### If you are on Fedora (41+), or any other distribution using dnf5 as the package manager

```bash
sudo dnf config-manager addrepo --id=mozilla --set=baseurl=https://packages.mozilla.org/rpm/firefox --set=gpgkey=https://packages.mozilla.org/rpm/firefox/signing-key.gpg --set=gpgcheck=1 --set=repo_gpgcheck=0
sudo dnf makecache --refresh
sudo dnf install firefox-beta
```

_Note: `repo_gpgcheck=0` deactivate the signature of metadata with GPG. However, this is safeguarded instead by HTTPS and package signatures (`gpgcheck=1`)._

#### If you are on openSUSE or any other distribution using zypper as the package manager

```bash
sudo rpm --import https://packages.mozilla.org/rpm/firefox/signing-key.gpg
sudo zypper ar --gpgcheck-allow-unsigned-repo https://packages.mozilla.org/rpm/firefox mozilla
sudo zypper refresh
sudo zypper install firefox-beta
```

#### For other RPM based distributions (RHEL, CentOS, Rocky Linux, older Fedora versions)

```bash
sudo tee /etc/yum.repos.d/mozilla.repo > /dev/null << EOF
[mozilla]
name=Mozilla Packages
baseurl=https://packages.mozilla.org/rpm/firefox
enabled=1
gpgcheck=1
repo_gpgcheck=0
gpgkey=https://packages.mozilla.org/rpm/firefox/signing-key.gpg
EOF
```

```bash
# For dnf users
sudo dnf makecache --refresh
sudo dnf install firefox-beta
```

```bash
# For zypper users
sudo zypper refresh
sudo zypper install firefox-beta
```

The _firefox-beta_ package will not conflict with your distribution’s Firefox package if you have it installed, you can have both at the same time!

#### Adding language packs

If your distribution language is set to a supported language, language packs for it should automatically be installed. You can also install them manually with the following command (replace `fr` with the language code of your choice):

```bash
sudo dnf install firefox-beta-l10n-fr
```

You can list the available languages with the following command:

```bash
dnf search firefox-beta-l10n
```

Don’t hesitate to report any problem you encounter to help us make your experience better.

## About Bastien Orivel

More articles by Bastien Orivel…
