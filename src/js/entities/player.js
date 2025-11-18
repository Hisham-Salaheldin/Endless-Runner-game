class Player {
		constructor()
		{
			this.ctx = ctx;
			this.img = playerImage;
			this.sw = 575;
			this.sh = 523;
			this.width = 100;
			this.height = 100;
			this.x = 100;
			this.y = ground;
			
			this.speed = 1;
			this.jumpForce = 10;
			this.maxY = this.height * 3;
			this.vy = 0;
			this.state = {
				ground: true,
				jump: false,
				mvForward : false,
				mvBackward : false
			};
			this.playerStates = playerStates;
			this.frameX = 0;
			this.frameY = 0;
			this.frameCounter = 0;
			this.frameStager = 5;
		}
		update()
		{
			this.FrameHandler();
			this.movementHandler();
			this.jumpMech();
			this.mvForward();
			this.mvBackward();
		}
		draw()
		{
			this.ctx.strokeStyle = "yellow";
			this.ctx.strokeRect(this.x, this.y, this.width, this.height);
			this.ctx.drawImage(this.img,
							this.frameX,this.frameY,
							this.sw, this.sh,
							this.x, this.y, this.width, this.height);
		}
		FrameHandler()
		{
			let position = Math.floor(this.frameCounter/this.frameStager) % PlayerSpriteAnimation["jump"].loc.length;
			this.frameX = this.sw * position;
			this.frameY = PlayerSpriteAnimation["jump"].loc[position].y;
			this.frameCounter++;
		}
		movementHandler()
		{
			if(keys.Up && this.onGround())//this.state.ground
			{
				this.state.jump = true;
				this.state.ground = false;
			}
			if(keys.Right)
				this.state.mvForward = true;
			if(keys.Left)
				this.state.mvBackward = true;
		}
		jumpMech()
		{
			if(this.state.jump && !this.state.ground)
			{
				this.vy += this.jumpForce;
				this.y -= this.jumpForce;
			}
			if(this.vy >= this.maxY)
				this.state.jump = false;
			if(!this.state.jump && !this.state.ground)
			{
				this.vy -= gravity;
				this.y += gravity;
				if(this.vy === 0)
					this.state.ground = true;
			}
	
			// this.y += this.vy;
			// if(this.state.jump && this.vy != -50)
			// {
			// 	this.vy -= 10;
			// }
			// else
			// 	this.vy = 0;
			// if(!this.onGround() && this.vy === 0)
			// {
			// 	this.state.jump = false;
			// 	this.vy += 5;
			// }
		}
		mvForward()
		{
			if(this.state.mvForward)
			{
				if((this.x + this.width) === WIDTH)
					this.x -= gameSpeed;
				this.x += gameSpeed;
			}
			if(!keys.ArrowRight)
				this.state.mvForward = false;
		}
		mvBackward()
		{
			if(this.state.mvBackward)
			{
				if(this.x === 0)
					this.x+=gameSpeed;
				this.x -= gameSpeed;
			}
			if(!keys.ArrowLeft)
				this.state.mvBackward = false;
		}
		onGround(){
			return this.y >= ground;
		}
	}