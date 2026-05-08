A modern branching strategy

_Ship/Show/Ask is a branching strategy that combines the features of Pull Requests with the ability to keep shipping changes. Changes are categorized as either Ship (merge into mainline without review), Show (open a pull request for review, but merge into mainline immediately), or Ask (open a pull request for discussion before merging)._

08 September 2021

Rouan Wilsenach

Rouan is a software engineer and technical leader, who helps build outstanding teams and high-quality software. He's worked in a variety of technology stacks for companies in the financial services, education, leisure and energy sectors (including as a consultant at Thoughtworks). He cares about keeping things simple, building inclusive teams, and writing about what he learns.

## Contents

* How do you do Continuous Integration with Pull Requests?
* Introducing Ship / Show / Ask
 * Ship
 * Show
 * Ask
* The rules
* The conversation
* The balance
* Should my team adopt this approach?
 * If you mostly ship
 * If you mostly ask
* Conclusion

## How do you do Continuous Integration with Pull Requests?

Pull Requests have been widely adopted by many software teams. Some people love them, and some people long for the days of Continuous Integration – where you never created branches and your team put their changes together all the time.

In some ways, Pull Requests are a game changer. Code hosting tools offer fantastic code review functionality. There are loads of SaaS providers offering services that can run on your pull requests – from running your tests and checking code quality to deploying fully-fledged preview environments.

But the adoption of Pull Requests as the primary way of contributing code has created problems. We’ve lost some of the “Ready to Ship” mentality we had when we did Continuous Integration. Features-in-progress stay out of the way by delaying integration, and so we fall into the pitfalls of low-frequency integration that Continuous Integration sought to address.

Sometimes Pull Requests sit around and get stale, or we’re not sure what to work on while we wait for review. Sometimes they become bloated as we think “well, I may as well do this while I’m here.”

We also get tired of the number of Pull Requests we have to review, so we don't talk about the code anymore. We stop paying attention and we just click “Approve” or say “Looks good to me”.

## Introducing Ship / Show / Ask

There’s an approach to software branching I’ve used with my teams. It’s worked really well, so I’d like to share it with you.

Every time you make a change, you choose one of three options: Ship, Show or Ask.

### Ship

Figure 1: Change goes straight on mainline

This feels the most like Continuous Integration. You want to make a change, so you make it directly on your mainline. When you do this, you’re not waiting for anyone to take your change to production. You’re not asking for a code review. No fuss – just make the change, with all the usual Continuous Integration techniques to make it safe.

Works great when:

* I added a feature using an established pattern
* I fixed an unremarkable bug
* I updated documentation
* I improved my code based on your feedback

### Show

Figure 2: Open a PR for feedback, but merge it straight away

This is where we take the Continuous Integration mindset and still make use of all the goodness Pull Requests can give us. You make your change on a branch, you open a Pull Request, then you merge it without waiting for anyone. You’ll want to wait for your automated checks (tests, code coverage, preview environments, etc.), but you don’t wait for anyone’s feedback to proceed with taking your change live.

In doing so, you’ve taken your change live quickly while still creating a space for feedback and conversation. Your team should get notified of your pull request and they can then review what you’ve done. They can provide you with feedback on your approach or code. They can ask you questions. They can learn from what you’ve done.

Works great when:

* I would love your feedback on how this code could be better
* Look at this new approach or pattern I used
* I refactored X so now it looks like this
* What an interesting bug! Look how I fixed it.

### Ask

Figure 3: Open a PR for feedback and wait before merging

Here we pause. We make our changes on a branch, we open a Pull Request, and we wait for feedback before merging. Maybe we’re not sure we’ve taken the right approach. Maybe there’s some code we’re not quite happy with but we’re unsure how to improve it. Maybe you’ve done an experiment and want to see what people think.

Modern code review tools offer a great space for this kind of conversation and you can even get a whole team together to look at a Pull Request and discuss it.

Works great when:

* Will this work?
* How do we feel about this new approach?
* I need help to make this better please
* I'm done for today, will merge tomorrow

## The rules

* Code review, or “Approval”, should not be a requirement for a Pull Request to be merged.
* People get to merge their own Pull Requests. This way they’re in control of whether their change is a “Show” or an “Ask”, and they can decide when it goes live.
* We’ve got to use all the great Continuous Integration and Continuous Delivery techniques that help keep the mainline releasable. Take Feature Toggles as one example.
* Our branches should not live long, and we should rebase them on the mainline often.

## The conversation

While Pull Requests can be a useful way of talking about changes, they have some pitfalls. The most alluring Anti Pattern is the idea that they can replace other ways of having a conversation.

One common problem with branching is that folks decide on an approach without discussing it. By the time a Pull Request is opened, time has been invested in a solution that may be sub-optimal. Reviewers are influenced by the selected solution and find it harder to suggest alternative approaches. The bigger the change-sets and the longer-living the branches, the worse this problem becomes. Talk to your team before you start, so you can get better ideas and avoid rework.

Remember that Pull Requests are not the only way to Show or Ask. Hop on a call or walk over to someone's desk. Show your work early and often. Ask for help and feedback early and often. Work on tasks together.

Not opening a Pull Request is also not a reason to avoid a conversation about the code. It’s important that your team still has a good feedback culture and talk to each other about what you think and learn.

## The balance

Now there are three options – which one should I be choosing more often?

It depends. I think each team will have their own balance at any given time.

When you’re delivering features in an established pattern, you’ll be doing more “Shipping”. When you’ve got a high degree of trust in the team and folks share the same quality standards, you’ll be doing more “Shipping” too.

But if you’re still getting to know each other or you’re all doing something new, then there’s a bigger need for conversation and so you’ll do more “Showing” and “Asking”. A junior engineer might often “Show” and “Ask”. A senior engineer might “Ship” a lot but occasionally “Show” a new technique or a refactoring everyone should try.

Some teams won't have much flexibility. Certain industries are highly regulated and an approval or review process will be required for every change. There are a variety of ways to implement this – whether you branch or not – which I won't go into here.

## Should my team adopt this approach?

You already have.

Think about how your team works and you’ll notice you’re doing some balance of Ship/Show/Ask. Most teams I’ve seen fall into one of two brackets: “Mostly Ship” or “Mostly Ask”.

### If you mostly ship

If you rarely branch and all commits go straight to the mainline, you're “Mostly Shipping”. If this is you, think about whether doing some “Showing” might help you.

A big part of why Pull Request models have become so popular is that they support remote-first and asynchronous teams. Explicitly “Showing” the interesting parts of your work to others can help them learn and feel included in the conversation, especially when they work remotely or different hours.

I’ve also found (especially in teams that don’t talk enough 1), always committing to mainline can mean problematic changes are only noticed weeks after they’re made. By this time it’s difficult to have a useful conversation about them because the details have gone fuzzy. Encouraging team members to use the “Show” approach means you can have more conversations about the code as you go.

1: Pair Programming is one effective technique for encouraging continuous communication in a team

### If you mostly ask

If your team is opening Pull Requests for most changes, you’re “Mostly Asking”. While Pull Requests are a useful tool for quality and feedback, they have a scaling problem. The unavoidable thing about waiting for approval is that it takes time. If too many changes are in the queue for feedback, either the quality of the feedback goes down or progress slows down. Try “Showing” more so you can get the best of both worlds.

The reason you’re reliant on a lot of “Asking” might be that you have trust issue. “All changes must be approved” or “Every pull request needs 2 reviewers” are common policies, but they show a lack of trust in the development team.

This is problematic, because an approval step is only a band-aid – it won’t fix your underlying trust issues. Do a bit more “Showing”, so you can release some of the pressure in your development pipeline. Then focus your efforts on activities that build trust, such as training, team discussions, or ensemble programming. Every time a developer “Shows” rather than “Asks” is an opportunity for them to build trust with their team.

Another reason you’re relying on lots of “Asking” might be that you don’t have a safe way to put changes on the mainline. In this case, you’ll need to be learning about and implementing techniques to keep your mainline releasable. In the meantime, more “Showing” can be a way to reduce the barrier to taking safe changes to production. The reduced barrier will then also act as an incentive to team members – if you can find a way to make your change safe, it can go live sooner.

## Conclusion

So what is Ship/Show/Ask? Fundamentally, it’s two things:

First – a trick to help you get the best of both worlds – merge your own pull request without waiting for feedback, then pay attention to the feedback when it comes.

Second – a more inclusive, dynamic way of viewing branching strategies. Ship/Show/Ask reminds us that each team’s approach sits on a continuum somewhere between “Always Ship” and “Always Ask”. It encourages us to think about each change independently and ask ourselves – should I Ship, Show or Ask?

## Acknowledgements

Thanks to the folks who provided detailed feedback on earlier drafts: Martin Fowler, Brian Guthrie, Federico Blancato, Stephen Cresswell and Paul Hammant.

Thanks also to Matthew Harward, Kief Morris, Giuseppe Pereira, Marcos Vinícius da Silva, Birgitta Böckeler, Prashanth R, Premanand Chandrasekaran, Joao Paulo Moraes, and Mark Taylor, who discussed a draft of this post on an internal ThoughtWorks mailing list.

## Footnotes

1: Pair Programming is one effective technique for encouraging continuous communication in a team

Significant Revisions

_08 September 2021:_ published
