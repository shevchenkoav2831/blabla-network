﻿namespace BlablaNetwork.Authorization
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
	public class AllowAnonymousAttribute : Attribute
	{ }
}

