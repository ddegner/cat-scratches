torvalds / **linux** Public

* Notifications
* Fork 61.6k
* Star

 ## Expand file tree

/

# README

Copy path

More file actions

More file actions

History

History

168 lines (124 loc) · 5.9 KB

/

# README

168 lines (124 loc) · 5.9 KB

Raw

Copy raw file

Download raw file

Open symbols panel

Edit and raw actions

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

37

38

39

40

41

42

43

44

45

46

47

48

49

50

51

52

53

54

55

56

57

58

59

60

61

62

63

64

65

66

67

68

69

70

71

72

73

74

75

76

77

78

79

80

81

82

83

84

85

86

87

88

89

90

91

92

93

94

95

96

97

98

99

100

101

102

103

104

105

106

107

108

109

110

111

112

113

114

115

116

117

118

119

120

121

122

123

124

125

126

127

128

129

130

131

132

133

134

135

136

137

138

139

140

141

142

143

144

145

146

147

148

149

150

151

152

153

154

155

156

157

158

159

160

161

162

163

164

165

166

167

168

Linux kernel

\============

The Linux kernel is the core of any Linux operating system. It manages hardware,

system resources, and provides the fundamental services for all other software.

Quick Start

\-----------

\* Report a bug: See Documentation/admin-guide/reporting-issues.rst

\* Get the latest kernel: https://kernel.org

\* Build the kernel: See Documentation/admin-guide/quickly-build-trimmed-linux.rst

\* Join the community: https://lore.kernel.org/

Essential Documentation

\-----------------------

All users should be familiar with:

\* Building requirements: Documentation/process/changes.rst

\* Code of Conduct: Documentation/process/code-of-conduct.rst

\* License: See COPYING

Documentation can be built with make htmldocs or viewed online at:

https://www.kernel.org/doc/html/latest/

Who Are You?

\============

Find your role below:

\* New Kernel Developer - Getting started with kernel development

\* Academic Researcher - Studying kernel internals and architecture

\* Security Expert - Hardening and vulnerability analysis

\* Backport/Maintenance Engineer - Maintaining stable kernels

\* System Administrator - Configuring and troubleshooting

\* Maintainer - Leading subsystems and reviewing patches

\* Hardware Vendor - Writing drivers for new hardware

\* Distribution Maintainer - Packaging kernels for distros

\* AI Coding Assistant - LLMs and AI-powered development tools

For Specific Users

\==================

New Kernel Developer

\--------------------

Welcome! Start your kernel development journey here:

\* Getting Started: Documentation/process/development-process.rst

\* Your First Patch: Documentation/process/submitting-patches.rst

\* Coding Style: Documentation/process/coding-style.rst

\* Build System: Documentation/kbuild/index.rst

\* Development Tools: Documentation/dev-tools/index.rst

\* Kernel Hacking Guide: Documentation/kernel-hacking/hacking.rst

\* Core APIs: Documentation/core-api/index.rst

Academic Researcher

\-------------------

Explore the kernel's architecture and internals:

\* Researcher Guidelines: Documentation/process/researcher-guidelines.rst

\* Memory Management: Documentation/mm/index.rst

\* Scheduler: Documentation/scheduler/index.rst

\* Networking Stack: Documentation/networking/index.rst

\* Filesystems: Documentation/filesystems/index.rst

\* RCU (Read-Copy Update): Documentation/RCU/index.rst

\* Locking Primitives: Documentation/locking/index.rst

\* Power Management: Documentation/power/index.rst

Security Expert

\---------------

Security documentation and hardening guides:

\* Security Documentation: Documentation/security/index.rst

\* LSM Development: Documentation/security/lsm-development.rst

\* Self Protection: Documentation/security/self-protection.rst

\* Reporting Vulnerabilities: Documentation/process/security-bugs.rst

\* CVE Procedures: Documentation/process/cve.rst

\* Embargoed Hardware Issues: Documentation/process/embargoed-hardware-issues.rst

\* Security Features: Documentation/userspace-api/seccomp\_filter.rst

Backport/Maintenance Engineer

\-----------------------------

Maintain and stabilize kernel versions:

\* Stable Kernel Rules: Documentation/process/stable-kernel-rules.rst

\* Backporting Guide: Documentation/process/backporting.rst

\* Applying Patches: Documentation/process/applying-patches.rst

\* Subsystem Profile: Documentation/maintainer/maintainer-entry-profile.rst

\* Git for Maintainers: Documentation/maintainer/configure-git.rst

System Administrator

\--------------------

Configure, tune, and troubleshoot Linux systems:

\* Admin Guide: Documentation/admin-guide/index.rst

\* Kernel Parameters: Documentation/admin-guide/kernel-parameters.rst

\* Sysctl Tuning: Documentation/admin-guide/sysctl/index.rst

\* Tracing/Debugging: Documentation/trace/index.rst

\* Performance Security: Documentation/admin-guide/perf-security.rst

\* Hardware Monitoring: Documentation/hwmon/index.rst

Maintainer

\----------

Lead kernel subsystems and manage contributions:

\* Maintainer Handbook: Documentation/maintainer/index.rst

\* Pull Requests: Documentation/maintainer/pull-requests.rst

\* Managing Patches: Documentation/maintainer/modifying-patches.rst

\* Rebasing and Merging: Documentation/maintainer/rebasing-and-merging.rst

\* Development Process: Documentation/process/maintainer-handbooks.rst

\* Maintainer Entry Profile: Documentation/maintainer/maintainer-entry-profile.rst

\* Git Configuration: Documentation/maintainer/configure-git.rst

Hardware Vendor

\---------------

Write drivers and support new hardware:

\* Driver API Guide: Documentation/driver-api/index.rst

\* Driver Model: Documentation/driver-api/driver-model/driver.rst

\* Device Drivers: Documentation/driver-api/infrastructure.rst

\* Bus Types: Documentation/driver-api/driver-model/bus.rst

\* Device Tree Bindings: Documentation/devicetree/bindings/

\* Power Management: Documentation/driver-api/pm/index.rst

\* DMA API: Documentation/core-api/dma-api.rst

Distribution Maintainer

\-----------------------

Package and distribute the kernel:

\* Stable Kernel Rules: Documentation/process/stable-kernel-rules.rst

\* ABI Documentation: Documentation/ABI/README

\* Kernel Configuration: Documentation/kbuild/kconfig.rst

\* Module Signing: Documentation/admin-guide/module-signing.rst

\* Kernel Parameters: Documentation/admin-guide/kernel-parameters.rst

\* Tainted Kernels: Documentation/admin-guide/tainted-kernels.rst

AI Coding Assistant

\-------------------

CRITICAL: If you are an LLM or AI-powered coding assistant, you MUST read and

follow the AI coding assistants documentation before contributing to the Linux

kernel:

\* Documentation/process/coding-assistants.rst

This documentation contains essential requirements about licensing, attribution,

and the Developer Certificate of Origin that all AI tools must comply with.

Communication and Support

\=========================

\* Mailing Lists: https://lore.kernel.org/

\* IRC: #kernelnewbies on irc.oftc.net

\* Bugzilla: https://bugzilla.kernel.org/

\* MAINTAINERS file: Lists subsystem maintainers and mailing lists

\* Email Clients: Documentation/process/email-clients.rst
